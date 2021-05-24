import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
  IonToast,
} from '@ionic/react';
import { useContext, useState } from 'react';
import { Context } from '../defaults';
import { pay } from '../api';
import './Tab2.css';

const Tab2: React.FC = () => {
  const { counter, menuItems } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  let order = [] as any;
  let summa = 0;
  // @ts-ignore
  counter.forEach((el1) => {
    // @ts-ignore
    menuItems.forEach((el2) => {
      if (el1.id === el2.id) {
        order.push({ id: el1.id, name: el2.name, count: el1.count, price: el1.count * el2.price });
      }
    });
  });

  order.forEach((el: any) => {
    summa += el.price;
  });

  const payOrder = () => {
    setLoading(true);
    pay(order).then((res: any) => {
      setLoading(false);
      setToast(true);
      order = [];
    });
  };
  return (
    <IonPage>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            {order.length >= 1 ? 'Ваш заказ:' : 'Вы еще не сделали свой заказ!'}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            onDidDismiss={() => setLoading(false)}
            message={'Обработка...'}
          />
          <IonToast
            isOpen={toast}
            onDidDismiss={() => setToast(false)}
            message="Успешно оплачено"
            duration={200}
          />
          {
            // @ts-ignore
            !!order &&
              // @ts-ignore
              order?.map((item: any, index) => {
                // @ts-ignore
                return (
                  <IonGrid key={index}>
                    <IonRow>
                      <IonCol style={{ width: 105 }}>
                        <h3>{item.name}</h3>
                      </IonCol>
                      <IonCol></IonCol>
                      <IonCol>
                        <div>
                          <b>{item.count}</b>
                        </div>
                      </IonCol>
                      <IonCol>{item.price}</IonCol>
                    </IonRow>
                  </IonGrid>
                );
              })
          }
          {order.length >= 1 && (
            <>
              <IonGrid>
                <IonRow>
                  <IonCol></IonCol>
                  <IonCol></IonCol>
                  <IonCol>Сумма: </IonCol>
                  <IonCol>{summa}</IonCol>
                </IonRow>
              </IonGrid>
              <IonButton expand="block" color="success" onClick={payOrder}>
                Оплатить заказ
              </IonButton>
            </>
          )}
        </IonCardContent>
      </IonCard>
    </IonPage>
  );
};

export default Tab2;
