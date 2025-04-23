export function getTotalPages<T>(items: T[], pageSize: number): number {
  return Math.ceil(items.length / pageSize);
}

export function getByPage<T>(items: T[], page: number, pageSize: number): T[] {
  // TODO handle edge case
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return items.slice(startIndex, endIndex);
}

export function buildPaginationParams<T>(
  items: T[],
  pageSize: number
): {
  params: { page: number };
  props: { items: T[]; previousPage?: number; nextPage?: number };
}[] {
  const totalPage = getTotalPages(items, pageSize);

  const pathPages = Array.from({ length: totalPage }, (_, index) => {
    const page = index + 1;
    const previousPage = page > 1 ? page - 1 : undefined;
    const nextPage = page < totalPage ? page + 1 : undefined;

    return {
      params: { page: page },
      props: {
        items: getByPage(items, page, pageSize),
        previousPage: previousPage,
        nextPage: nextPage,
      },
    };
  });

  return pathPages;
}
