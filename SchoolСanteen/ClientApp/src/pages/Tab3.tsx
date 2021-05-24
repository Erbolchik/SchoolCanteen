import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonModal,
  IonText,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getLoggerUser } from '../api';
import { User } from '../api/models';
import './Tab3.css';
import { calendarOutline, callOutline, mailOutline, personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

const Tab3: React.FC = () => {
  const [loggedUser, setLoggedUser] = useState<User>();
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getLoggerUser().then(({ data }) => setLoggedUser(data));
  }, []);

  const history = useHistory();

  const routeChange = () => {
    history.push('/history');
  };

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
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="light">
              <IonIcon slot="start" name="ios-arrow-back">
                Favorites
              </IonIcon>
            </IonButton>
          </IonButtons>
          <IonTitle>&nbsp;</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon slot="mail-outline"></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonModal isOpen={showModal}>
          {showModal && (
            <>
              <IonHeader style={{ marginTop: 35 }}>
                <IonTitle>История заказов</IonTitle>
              </IonHeader>

              <IonList style={{ marginTop: 15 }} lines="inset">
                {orderHistory &&
                  // @ts-ignore
                  orderHistory.map((item, index) => {
                    return (
                      <IonItem key={index}>
                        <IonLabel style={{ marginRight: '15px' }}>
                          <h3>Заказ №{item.id}</h3>
                          <p>Дата: {item.date}</p>
                        </IonLabel>
                        <IonText>{item.summ}</IonText>
                      </IonItem>
                    );
                  })}
              </IonList>
              <IonButton color="secondary" size="default" onClick={() => setShowModal(false)}>
                Закрыть
              </IonButton>
            </>
          )}
        </IonModal>
        <IonCard>
          <IonHeader>
            <IonAvatar className="avatar">
              <img src="https://bipbap.ru/wp-content/uploads/2018/03/01-700x1050-640x960.jpg" />
            </IonAvatar>
          </IonHeader>
          <IonCardContent>
            <IonList>
              <IonListHeader>Персональная информация</IonListHeader>
              <IonItem>
                <IonIcon icon={mailOutline} />
                <span className="info">Почтовый адрес:</span>
                <IonLabel> {loggedUser?.email}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={callOutline} />
                <span className="info">Номер телефона:</span>
                <IonLabel> {loggedUser?.phoneNumber}</IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={personOutline} />
                <span className="info">ФИО:</span>
                <IonLabel>
                  {loggedUser?.firstName} {loggedUser?.lastName} {loggedUser?.middleName}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonIcon icon={calendarOutline} />
                <span className="info">Дата регистрации:</span>
                <IonLabel> {loggedUser?.registrationDate}</IonLabel>
              </IonItem>
            </IonList>
            <IonButton expand="full" color="secondary" onClick={routeChange}>
              История заказов
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
