require('dotenv').config();

const createPaginationLinks = (req, page, limit, totalPages) => {

  const baseUrl = `${process.env.BASE_URL}${req.baseUrl}${req.path}`;

  let links = {};

  links.first = `${baseUrl}?page=1&limit=${limit}`;
  links.last = `${baseUrl}?page=${totalPages}&limit=${limit}`;
  links.prev = page > 1 ? `${baseUrl}?page=${page - 1}&limit=${limit}` : null;
  links.next = page < totalPages ? `${baseUrl}?page=${page + 1}&limit=${limit}` : null;

  return links;

};

module.exports = { createPaginationLinks };