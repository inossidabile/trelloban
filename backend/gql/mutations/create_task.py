import graphene

from models.task import Task, TaskType


class CreateTask(graphene.Mutation):
    class Arguments:
        board_handle = graphene.String()
        column_handle = graphene.String()
        description = graphene.String()

    task = graphene.Field(TaskType)

    def mutate(root, info, board_handle, column_handle, description):
        task = Task(board_handle, column_handle=column_handle, description=description)
        task.save()
        return CreateTask(task)
