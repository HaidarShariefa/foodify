import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "./store/actions/categoryActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategories(dispatch);
  }, [dispatch]);

  return <h1 className="text-amber-700">Hello World</h1>;
}

export default App;
