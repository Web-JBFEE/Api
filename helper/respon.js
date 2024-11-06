// Helper function for standard JSON response
exports.createResponse = (code, status, message, data) => {
    return {
      code: code,
      status: status,
      message: message,
      data: data,
    };
  };
  
  // Helper function for paginated JSON response
  exports.createPaginatedResponse = (code, status, message, pagination, data) => {
    return {
      code: code,
      status: status,
      message: message,
      meta: pagination, // Pagination is stored under 'meta'
      data: data,
    };
  };
  