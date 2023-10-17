interface MyInterface {
  pagination(resultPerPage: number): void;
}

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
  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["keyword", "page", "limit"];
    removeFields?.forEach((key) => delete queryCopy[key]);
    if (queryCopy) {
      const queryCopyRegex = new RegExp(queryCopy?.category, "i");
      this.query = this.query?.find({ category: { $regex: queryCopyRegex } });

      // Filter for Price and Rating

      let queryStr = JSON.stringify(queryCopy);

      queryStr = queryStr?.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

      this.query = this.query.find(JSON.parse(queryStr));
    }

    return this;
  }
  pagination(resultPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
