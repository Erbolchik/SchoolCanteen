import {
  IonContent,
  IonHeader,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonItem,
  IonText,
  IonToolbar,
  IonBackButton,
  IonButtons,
} from '@ionic/react';
import { getLoggerUser, getMyOrders } from '../api';
import { useEffect, useState } from 'react';

const OrderHistory: React.FC = () => {
  const [myOrders, setMyOrders] = useState();

  useEffect(() => {
    getMyOrders().then(({ data }) => setMyOrders(data));
  }, []);

  const orderHistory = [
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },

    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
    { id: 1, date: '18.11.1999', summ: 1500 },
    { id: 2, date: '30.03.2000', summ: 2540 },
    { id: 3, date: '28.02.1999', summ: 500 },
    { id: 4, date: '05.08.2000', summ: 1530 },
  ];

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>?????????????? ??????????????:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonList style={{ marginTop: 15 }} lines="inset">
          {myOrders &&
            // @ts-ignore
            myOrders.map((item, index) => {
              return (
                <IonItem key={index}>
                  <IonLabel style={{ marginRight: '15px' }}>
                    <h3>?????????? ???{item.id}</h3>
                    <p>????????: {new Date(item.date).toLocaleDateString()}</p>
                    <p>??????????????????: {item.price}</p>
                  </IonLabel>
                  <IonText>{item.summ}</IonText>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default OrderHistory;
