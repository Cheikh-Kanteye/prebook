import axios, { AxiosResponse } from "axios";

// A cacher
const API_KEY = "AIzaSyALCI9_NhJaoPN5w_KVr8cJVXs7Mnne8bY";

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  // Ajoutez d'autres propriétés du livre si nécessaire
}

interface Props {
  GENRES: string[];
  API_URL: string;
}

export const fetchBooks = async ({
  GENRES = [],
  API_URL,
}: Props): Promise<Book[]> => {
  try {
    const responses: AxiosResponse<any>[] = await Promise.all(
      GENRES.map((genre) => {
        return axios.get("https://www.googleapis.com/books/v1/volumes", {
          params: {
            q: genre !== "all" ? `subject:${genre}` : "",
            key: API_KEY,
            maxResults: 5,
          },
        });
      })
    );
    const sortedBooks: Book[] = responses.map((response, index) => {
      const booksData = response.data.items || [];
      const books: Book[] = booksData.map((bookData: any) => ({
        id: bookData.id,
        title: bookData.volumeInfo.title,
        author: bookData.volumeInfo.authors
          ? bookData.volumeInfo.authors[0]
          : "Unknown",
        genre: GENRES[index],
        // Ajoutez d'autres propriétés du livre si nécessaire
      }));
      return books;
    });

    const allBooks: Book[] = sortedBooks.flat();
    return allBooks;
  } catch (error) {
    console.error("Error searching books:", error);
    return [];
  }
};
