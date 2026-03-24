// import SimplePost from "./components/Simple/SimplePost";
// import PostWithComments from "./components/UserInteraction/PostWithComments";

import { ShoppingList } from "./components/Errors/ShoppingList";
import { ShoppingListErrorMessage } from "./components/Errors/ShoppingListErrorMessage";

function App() {
  function selecetedItem(item: string) {
    console.log(item);
  }

  return (
    <>
      {/* First Test Case */}
      {/* <h1>Hello</h1> */}

      {/* <SimplePost
        content="The Sky is Blue"
        user="Alex"
        likesBy={["John", "Mary"]}
      /> */}

      {/* <PostWithComments content={"Comment Here"} user={"User"} /> */}

      <ShoppingList groceries={[]} selectItem={selecetedItem} />
      <ShoppingListErrorMessage groceries={[]} selectItem={selecetedItem} />
    </>
  );
}

export default App;
