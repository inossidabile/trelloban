import logging
import graphene

from models.task import Task, TaskType


logging.basicConfig()
log = logging.getLogger("pynamodb")
log.setLevel(logging.DEBUG)
log.propagate = True


class SortTasks(graphene.Mutation):
    class Arguments:
        board_handle = graphene.String()
        column_handle = graphene.String()
        task_handles = graphene.List(graphene.String)

    task_handles = graphene.Field(graphene.List(graphene.String))

    def mutate(root, info, board_handle, column_handle, task_handles):
        all_handles = set(
            [
                x.task_handle
                for x in Task.query(
                    board_handle,
                    filter_condition=Task.column_handle == column_handle,
                    attributes_to_get=Task.task_handle,
                )
            ]
        )

        for i, x in enumerate([x for x in task_handles if x in all_handles]):
            all_handles.discard(x)
            task = Task(board_handle, x)
            task.update(
                actions=[
                    Task.order.set(i),
                ],
            )

        return SortTasks(task_handles)
