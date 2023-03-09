import axios from 'axios';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.BASE_URL = 'https://pixabay.com/api';
    this.KEY = '34211623-75c46b579cfb3e0435f791aca';
    this.PARAMETERS =
      'image_type=photo&orientation=horizontal&safesearch=true&per_page=40';
    this.FIELDS =
      'fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads';
  }
  async fetchSearch() {
    const result = await axios.get(
      `${this.BASE_URL}/?key=${this.KEY}&q=${this.searchQuery}&${this.PARAMETERS}&${this.FIELDS}&page=${this.page}`
    );
    this.incermanPage();
    return result.data;
  }
  incermanPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
