export type Paging = {
    size: number;
    total_page: number;
    current_page: number;
}

export type Pageable<T> = {
    message: string;
    status: string;
    data: Array<T>;
    paging: Paging
}