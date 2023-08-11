export interface ApiResponse_<T> {
    timeStamp: string,
    statusCode: number,
    status: string,
    message: string ,
    data: {
        page: {
            content: [T],
            pageable: {
                sort: {
                    sorted: boolean,
                    unsorted: boolean,
                    empty: boolean
                },
                offset: number,
                pageNumber: number,
                pageSize: 10,
                paged: boolean,
                unpaged: boolean
            },
            last: boolean,
            totalPages: number,
            totalElements: number,
            size: number,
            number: number,
            sort: {
                sorted: boolean,
                unsorted: boolean,
                empty: boolean
            },
            first: boolean,
            numberOfElements: number,
            empty: boolean
        }
    }
}