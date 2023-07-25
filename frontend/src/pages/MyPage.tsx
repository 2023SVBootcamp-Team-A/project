import "./MyPage.css";

export default function MyPage() {
  return (
    <>
      <div className="title">
        <h1>My Page</h1>
      </div>
      <div className="bookShelf">
        <div className="books-container">
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/1.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 1</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/2.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 2</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/3.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 3</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/4.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 4</figcaption>
            </figure>
          </div>
        </div>
        <div className="floor-thickness"></div>
        <div className="books-container">
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/5.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 1</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/6.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 2</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/7.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 3</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/8.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 4</figcaption>
            </figure>
          </div>
        </div>
        <div className="floor-thickness"></div>
        <div className="books-container">
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://raw.github.com/peterwestendorp/shelves/master/photos/9.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 1</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://image.freepik.com/free-photo/wall-wallpaper-concrete-colored-painted-textured-concept_53876-31799.jpg"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 2</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://picsum.photos/200"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 3</figcaption>
            </figure>
          </div>
          <div className="book">
            <figure className="bookContainer">
              <img
                src="https://picsum.photos/200"
                alt="random photo"
                className="photocard"
              />
              <figcaption className="bookName">Book 4</figcaption>
            </figure>
          </div>
        </div>
        <div className="floor-thickness"></div>
      </div>
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10 mt-12">
          <li>
            <a href="#" className="navLeftArrow">
              &lt;
            </a>
          </li>
          <li>
            <a href="#" className="navFirstItem">
              1
            </a>
          </li>
          <li>
            <a href="#" className="navSecondItem">
              2
            </a>
          </li>
          <li>
            <a href="#" aria-current="page" className="navThirdItem">
              3
            </a>
          </li>
          <li>
            <a href="#" className="navFourthItem">
              4
            </a>
          </li>
          <li>
            <a href="#" className="navFifthItem">
              5
            </a>
          </li>
          <li>
            <a href="#" className="navRightArrow">
              &gt;
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
