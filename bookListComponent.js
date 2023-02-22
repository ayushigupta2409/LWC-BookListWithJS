import { LightningElement } from 'lwc'
const BOOK_URL = 'https://www.googleapis.com/books/v1/volumes?q='

export default class BookListComponent extends LightningElement {
    query='life'
    books
    timer
    connectedCallback(){
        this.fetchBookData()
    }//in order to show data on page load, we use connectedcallback lifecyclehook
    fetchBookData(){
        fetch(BOOK_URL+this.query).then(response=>response.json())
        /*fetch api in js provides interface for fetching resources and this fetch method return a promise to which we apply then and catch
        response is not in json, so we convert it into json. Also, in js, if then()
        returns something, it is another promise altogether, so we put then and catch over that
        here .json() will again return a promise so we use then and catch over it
        */
        .then(data=>{
            console.log(data)
            this.books=data
        })
        .catch(error=>console.error(error))
    }
    fetchBooksHandler(event){
        this.query = event.target.value
        window.clearTimeout(this.timer)//debouncing technique for searching
        this.timer=setTimeout(()=>{
            this.fetchBookData()
        },1000)//we use setTimeOut so that fetchBookData runs after some time, otherwise it would keep calling
    }//performance efficient techninque for searching

}
