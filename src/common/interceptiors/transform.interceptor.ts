import { InitialPaginationResponseType, PaginationForm } from "../../types";

export const calcListTotalCount = (totalCount = 0, limit = 0): { totalResult: number; totalPage: number } => {
	const totalResult = totalCount;
	const totalPage = totalResult % limit === 0 ? totalResult / limit : Math.floor(totalResult / limit) + 1;
	return { totalResult, totalPage };
};

export function createPaginationForm<ResponseType extends InitialPaginationResponseType>(
	responseData: ResponseType,
	paginationInfo: { limit: number; page: number; search?: string },
	requestToResponse?: `${number}ms`,
): PaginationForm<ResponseType> {
	const { limit, page, search } = paginationInfo;
	const { totalPage, totalResult } = calcListTotalCount(responseData.count, limit);
	return {
		result: true,
		code: 1000,
		requestToResponse,
		data: {
			list: responseData.list,
			count: responseData.count,
			page,
			totalResult,
			totalPage,
			search,
		},
	};
}