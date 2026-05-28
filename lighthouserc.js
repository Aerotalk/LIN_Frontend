module.exports = {
  ci: {
    collect: {
      url: ['https://test.loaninneed.in/'],
      numberOfRuns: 3,
    },
    upload: {
      target: 'temporary-public-storage', // Uploads to a temporary public URL for easy viewing
    },
  },
};
