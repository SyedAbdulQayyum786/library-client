export interface Book {
  bookId: number;
  title: string;
  authorName: string;
  count: number;
}

export interface User {
  name: string;
  username: string;
  password: string;
  role: "Super Admin" | "Librarian" | "Reader";
  books: Book[];
  assignedLibraries?: Libraries[];
  requests?:Requests[];  
}

export interface Member {
  name: string;
  email: string;
  membershipStartDate: string; 
  booksIssuedCount: number;
}

export interface Libraries {
  name: string;
  totalbookscount: number;
  totallibrarianscount: number;
  totalmemberscount: number;
  books: Book[];
  members: Member[];  
}
export interface Requests{
  id:number;
  bookname:string;
  readername:string;
  requeststatus:string;
}

const AllRequests:Requests[]=[
  {id:1,bookname:'1984',readername:'Haziq',requeststatus:'Submitted'},
  {id:2,bookname:'The Catcher in the Rye',readername:'Aarish',requeststatus:'Completed'}
]
export {AllRequests}

const AllLibraryMembers: Member[] = [
  { name: "Ali Raza", email: "Ali.Raza@lib.com", membershipStartDate: "2020-01-15", booksIssuedCount: 0 },
  { name: "Muhammad Awais", email: "Muhammad.Awais@lib.com", membershipStartDate: "2019-07-22", booksIssuedCount: 0 },
];
export { AllLibraryMembers};

const allBooks: Book[] = [
  { bookId: 1, title: "The Great Gatsby", authorName: "F. Scott Fitzgerald", count: 3 },
  { bookId: 2, title: "1984", authorName: "George Orwell", count: 3 },
  { bookId: 3, title: "To Kill a Mockingbird", authorName: "Harper Lee", count: 2 },
  { bookId: 4, title: "The Catcher in the Rye", authorName: "J.D. Salinger", count: 1 },
  { bookId: 5, title: "Pride and Prejudice", authorName: "Jane Austen", count: 4 },
  { bookId: 6, title: "Moby Dick", authorName: "Herman Melville", count: 2 },
  { bookId: 7, title: "The Odyssey", authorName: "Homer", count: 5 },
  { bookId: 8, title: "Brave New World", authorName: "Aldous Huxley", count: 3 },
  { bookId: 9, title: "The Brothers Karamazov", authorName: "Fyodor Dostoevsky", count: 2 },
  { bookId: 10, title: "Crime and Punishment", authorName: "Fyodor Dostoevsky", count: 4 },
  { bookId: 11, title: "War and Peace", authorName: "Leo Tolstoy", count: 2 },
  { bookId: 12, title: "The Hobbit", authorName: "J.R.R. Tolkien", count: 3 },
  { bookId: 13, title: "Fahrenheit 451", authorName: "Ray Bradbury", count: 2 },
  { bookId: 14, title: "Jane Eyre", authorName: "Charlotte Brontë", count: 3 },
  { bookId: 15, title: "Wuthering Heights", authorName: "Emily Brontë", count: 4 },
  { bookId: 16, title: "The Divine Comedy", authorName: "Dante Alighieri", count: 2 },
  { bookId: 17, title: "The Iliad", authorName: "Homer", count: 3 },
  { bookId: 18, title: "Les Misérables", authorName: "Victor Hugo", count: 2 },
  { bookId: 19, title: "Don Quixote", authorName: "Miguel de Cervantes", count: 4 },
  { bookId: 20, title: "Ulysses", authorName: "James Joyce", count: 1 },
];




export interface Libraries {
  name: string;
  totalbookscount: number;
  totallibrarianscount: number;
  totalmemberscount: number;
  books: Book[];
  members: Member[];  
}

const allLibraries: Libraries[] = [
  {
    name: "Central Library",
    totalbookscount: 12000,
    totallibrarianscount: 15,
    totalmemberscount: 5000,
    books:allBooks,
    members: [
      { name: "Ali Raza1", email: "Ali.Raza@lib.com", membershipStartDate: "2020-01-15", booksIssuedCount: 0 },
      { name: "Muhammad Awais1", email: "Muhammad.Awais@lib.com", membershipStartDate: "2019-07-22", booksIssuedCount: 0 },
    ]
  },
  {
    name: "Westside Community Library",
    totalbookscount: 7500,
    totallibrarianscount: 10,
    totalmemberscount: 3200,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Eastside Public Library",
    totalbookscount: 9000,
    totallibrarianscount: 12,
    totalmemberscount: 4100,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Downtown Library",
    totalbookscount: 15000,
    totallibrarianscount: 20,
    totalmemberscount: 6000,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Northside Library",
    totalbookscount: 6500,
    totallibrarianscount: 8,
    totalmemberscount: 2900,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Southside Community Library",
    totalbookscount: 8000,
    totallibrarianscount: 9,
    totalmemberscount: 3500,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Uptown Library",
    totalbookscount: 11000,
    totallibrarianscount: 14,
    totalmemberscount: 4700,
    books:allBooks,
    members:AllLibraryMembers
  },
  {
    name: "Riverside Library",
    totalbookscount: 7000,
    totallibrarianscount: 11,
    totalmemberscount: 3300,
    books:allBooks,
    members:AllLibraryMembers
  
  },
];

export default allLibraries;




export const superAdmin: User = {
  name: "Syed Abdul Qayyum",
  username: "superadmin@lib.com",
  password: "superadmin123",
  role: "Super Admin",
  books: allBooks,
  requests:AllRequests 
};

export let librarians: User[] = [
  {
    name: "Abdul Qayyum",
    username: "abdulqayyum@lib.com",
    password: "librarian123",
    role: "Librarian",
    books: allBooks,
    assignedLibraries: [allLibraries[0]],
    requests:[]
  },
  {
    name: "Haziq Affan",
    username: "haziq@lib.com",
    password: "librarian234",
    role: "Librarian",
    books:allBooks,
    assignedLibraries: [allLibraries[1]],
    requests:[]    
  },
  {
    name: "Muhammad Haris",
    username: "haris@lib.com",
    password: "haris123",
    role: "Librarian",
    books:allBooks,
    assignedLibraries: [allLibraries[2]],
    requests:[]    
  },
];

export let readers: User[] = [
  {
    name: "M Haris",
    username: "haris",
    password: "reader123",
    role: "Reader",
    books:allBooks,
    requests:[]
  },
  {
    name: "M Awais",
    username: "awais",
    password: "reader234",
    role: "Reader",
    books: allBooks,
    requests:[]
  },
];

export const users = [superAdmin, ...librarians, ...readers];
