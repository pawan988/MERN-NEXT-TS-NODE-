class ApiFeatures {
  query: any;
  queryStr: any;
  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword;

    if (keyword) {
      const keywordRegex = new RegExp(keyword, "i");
      this.query = this.query.find({ name: { $regex: keywordRegex } });
    }

    return this;
  }
}

export default ApiFeatures;
