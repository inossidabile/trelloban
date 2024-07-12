import graphene

from models.column import Column, ColumnType


class CreateColumn(graphene.Mutation):
    class Arguments:
        board_handle = graphene.String()
        name = graphene.String()

    column = graphene.Field(ColumnType)

    def mutate(root, info, board_handle, name):
        column = Column(board_handle, name=name)
        column.save()
        return CreateColumn(column)
