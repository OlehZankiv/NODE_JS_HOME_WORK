export const getPaginationParams = ({ page, limit } = {}) => ({
  page: isNaN(+page) ? null : +page,
  limit: isNaN(+limit) ? null : +limit,
});
