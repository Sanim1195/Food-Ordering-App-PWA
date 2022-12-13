import { useEffect, useState } from "react";
import classes from './Resturant.module.css';

const Resturant = () => {
  const [orders, setOrders] = useState([]);
  const [update, setUpdate] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();


  // get orders from firebase and display them
  useEffect(() => {
    // fetchig data from database

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

      setOrders(loadedMeals);
      console.log(loadedMeals);
      setIsLoading(false);
    };

    fetchOrders().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, [])

  if (isLoading) {
    return (
      <section >
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section>
        <p>{httpError}</p>
      </section>
    );
  }

  // delete order from firebase and remove it from the page
  const orderComplete = async (id) => {
    // map through the orders and only display the orders that are not completed
    const uncompletedOrders = orders.filter((order) => order.isCompleted !== true);
    setUpdate(uncompletedOrders);
    console.log(update);
    try {

      console.log(id.id);
      console.log(id)
      const key = id.id;
      console.log("Order COmplete status:  " + id.isCompleted);
      // set the isOrderComplete to true
      // !id.isCompleted ? id.isCompleted = true : id.isCompleted = false;
      !id.isCompleted && (id.isCompleted = true);
      const response = await fetch(
        `https://himeals-default-rtdb.firebaseio.com/orders/${key}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            isCompleted: true,
          })
          ,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    // if (!response.ok) {
    //   throw new Error('Something went wrong! The fuck');
    // }
    // const responseData = await response.json();
    // console.log(responseData);


    //delete the order from the list
    const newOrders = orders.filter((order) => order.id !== id);
    setOrders(newOrders);

    // delete the order from the database

    // const response = await fetch(
    //   `https://himeals-default-rtdb.firebaseio.com/orders/${id.id}.json`,
    //   {
    //     method: 'DELETE',
    //   }
    // );
  };







  // *****************************************************************************


  // orders.map = (order) => {
  //   console.log()
  // }
  // mapping through the orders array and displaying the orders


  // Object.values(orders).map((order, index) => {
  //   console.log(order.order);
  //   return (
  //     <div key={index}>
  //       <h1>{console.log(order)}</h1>
  //       <h1>{order} </h1>
  //     </div>
  //   )
  // });


  // ****************************************************************

  return (
    <>
      <nav className={classes.navbar}>
        <span className={classes.header}>
          Orders:
        </span>
      </nav>
      <div >
        {
          orders.map((order) => {
            return (
              <>
              
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
                    };
                  </div>
                  <div>
                    <button className={classes.flagButton} onClick={() => orderComplete(order)}>
                      Done!
                    </button>
                  </div>
                </div>
              </>
            );
          })
        }
      </div>
    </>
  )


}

export default Resturant;