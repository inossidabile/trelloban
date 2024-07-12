import graphene

from gql.mutations.sort_tasks import SortTasks
from gql.mutations.sort_coluns import SortColumns
from gql.mutations.create_column import CreateColumn
from gql.mutations.create_task import CreateTask
from models import Column, ColumnType, Task, TaskType


class BoardType(graphene.ObjectType):
    columns = graphene.List(ColumnType)
    tasks = graphene.List(TaskType)


class Query(graphene.ObjectType):
    board = graphene.Field(BoardType, handle=graphene.String())

    def resolve_board(root, _info, handle):
        columns = Column.query(handle)
        tasks = Task.query(handle)

        return {"columns": columns, "tasks": tasks}


class Mutations(graphene.ObjectType):
    create_column = CreateColumn.Field()
    create_task = CreateTask.Field()
    sort_columns = SortColumns.Field()
    sort_tasks = SortTasks.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
