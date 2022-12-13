import { useState, useEffect } from 'react';
import classes from './Resturant.module.css';

const Resturant = () => {
  const [orders, setOrders] = useState([]);
  const [uncompletedOrders, setUncompletedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  // get orders from firebase and display them
  useEffect(() => {

    const fetchOrders = async () => {
      // getting response from database
      const response = await fetch(
        'https://himeals-default-rtdb.firebaseio.com/orders.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();

      const loadedMeals = [];
      //  looping through the data and storing it in loadedMeals array
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          isCompleted: responseData[key].isCompleted,
          order: responseData[key].orderedItems,
          name: responseData[key].user,
          price: responseData[key].price,
        });
      }

      // console.log(loadedMeals);
      setOrders(loadedMeals);
      // console log orders
      setIsLoading(false);
      // console.log(orders);

    };
    fetchOrders().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);
  // Message to display when loading
  if (isLoading) {
    return (
      <section >
        <p>Loading...</p>
      </section>
    );
  }

  // Message to display when error
  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }
  console.log(orders);
  // filter the orders that are not completed and store them in a new array
  const filteredOrders = orders.filter((order) => {
    return order.isCompleted === false;
  });
  // console.log("filtered orders");
  // console.log(filteredOrders);


  // use for loop to loop through the orders and check if the order is completed or not and store them as a new array
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].isCompleted === false) {
      uncompletedOrders.push(orders[i]);
    }
  }
  // console.log("uncompleted orders");
  // console.log(uncompletedOrders);



  // delete the order from the list when the done button is clicked and set the order to completed in the database
  const deleteOrder = (id) => {

    console.log("id" + id.id);
    fetch(`https://himeals-default-rtdb.firebaseio.com/orders/${id.id}.json`, {
      method: 'PATCH',
      body: JSON.stringify({
        isCompleted: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // if response is okay splice the order from the list
      if (response.ok) {
        console.log("response is okay");

        console.log("uncompleted orders");
        console.log(uncompletedOrders);

        console.log("order completed");
        // delete the order from the list
        const index = uncompletedOrders.indexOf(id);
        console.log(index);
        uncompletedOrders.splice(index, 1);
        console.log(uncompletedOrders);
        // set the state of uncompleted orders
        setUncompletedOrders(uncompletedOrders);
        console.log("uncompleted orders");
        console.log(uncompletedOrders);

      }


    });
    // reload the page
    window.location.reload();


  };






  return (
    <>

      <nav className={classes.navbar}>
        <span className={classes.header}>
          Orders:
        </span>
      </nav>
      <div >
        {

          uncompletedOrders.map((order) => {
            console.log(order);
            return (
              <div className={classes.card}>
                <div className={classes.cardItems} key={order.id}>
                  <h1>{order.name.name} </h1>
                  {/* map array of orders here */}
                  {
                    order.order.map((item) => {
                      return (
                        <div key={item.id}>
                          <h1>{item.name} x {item.amount}</h1>
                        </div>
                      );
                    })
                  }
                </div>
                <div>
                  <button className={classes.flagButton} onClick={() => deleteOrder(order)}  >
                    Done!
                  </button>
                </div>
              </div>
            );
          })
        }
      </div>
    </>
  );
};





export default Resturant;