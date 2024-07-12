import graphene

from models.column import Column, ColumnType


class SortColumns(graphene.Mutation):
    class Arguments:
        board_handle = graphene.String()
        column_handles = graphene.List(graphene.String)

    columns = graphene.Field(graphene.List(ColumnType))

    def mutate(root, info, board_handle, column_handles):
        all_handles = set(
            [
                x.column_handle
                for x in Column.query(
                    board_handle,
                    attributes_to_get=Column.column_handle,
                )
            ]
        )
        column_handles = set([x for x in column_handles if x in all_handles])

        with Column.batch_write() as batch:
            items = [
                Column(board_handle, x, order=i)
                for i, x in enumerate(column_handles.union(all_handles))
            ]
            for item in items:
                batch.save(item)

        return SortColumns(items)
