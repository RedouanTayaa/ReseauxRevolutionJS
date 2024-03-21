interface TruncateParams {
    value: string;
    limit: number;
}
export function TruncatePipe({ value, limit }: TruncateParams) {
    return value?.length > limit ? value.substring(0, limit) + '...' : value;
}