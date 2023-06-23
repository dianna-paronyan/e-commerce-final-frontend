import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import Carousel from "../../components/Carousel";
import {
  fetchCategories,
  getCategories,
} from "../../features/categories-slice";
import "./Home.scss";

const imgs = [
  "../../../images/Hb9df86c1701c4716bffcd4d080b9aecaj.jpg_960x960-PhotoRoom.png-PhotoRoom.png",
  "../../../images/m-c-PhotoRoom.png-PhotoRoom.png",
  "../../../images/Classic-Small-Frame-Round-Sunglasses-Women-Men-Brand-Designer-Metal-Sun-Glasses-Vintage-Fashion-Eyewear-UV400.jpg_640x640-PhotoRoom.png-PhotoRoom.png",
];

function Home() {
  const categories = useSelector(getCategories);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  console.log(categories, "c");

  return (
    <div>
      <div className="photo"></div>
      <div className="txt">
        <h2>Sunglasses</h2>
        <div>
          <p>
            Authentic Sunglasses you love, from a company you can trust.
          </p>
          <hr />
        </div>
      </div>
      <div className="category-box">
        <h3>WHAT'S NEW IN STORE</h3>
        <div className="categories">
          {categories?.map((category, i) => (
            <Link to={`/category/${category.id}`} key={category.id}>
              <div>
                <div
                  className="category"
                  style={{ backgroundImage: `url(${imgs[i]})` }}
                ></div>
                <h4 className="category-name">{category.name}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Carousel />

      <div className="about" id="about">
        <h3>About</h3>
        <div className="about-box">
          <div className="image-box"></div>
          <div className="about-txt-box">
            <p>
              We founded The Sunglasses Shop with one goal in mind: providing
              high-quality eyewear online, at a great price. Our passion for
              excellence has driven us from the beginning, and continues to
              drive us into the future. We know that every product counts, and
              strive to make the entire shopping experience as rewarding as
              possible. Check it out for yourself!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
