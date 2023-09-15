class ApiFeatures {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  serach() {
    const keyWord = this.queryStr?.keyWord
      ? {
          name: {
            $regex: this.queryStr?.keyWord,
            $option: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyWord });
    return this;
  }
}

export default ApiFeatures;
