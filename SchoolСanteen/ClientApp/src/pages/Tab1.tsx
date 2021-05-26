import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { useContext, useState, useEffect } from 'react';
import './Tab1.css';
import { Context } from './../defaults/index';
import { useHistory } from 'react-router-dom';

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<any>();
  const history = useHistory();

  const { addItem, removeItem, counter, menuItems, token, setToken } = useContext(Context);

  useEffect(() => {
    const t = localStorage.getItem('token');
    if (t && !!history) {
      setToken(t);
    } else if (!!history) {
      history.push('/login');
    }
  }, [history]);

  const modalAction = (id: any) => {
    setShowModal(true);
    // @ts-ignore
    setCurrentMenu(menuItems.find((el) => el.id == id));
  };
  return (
    <IonPage>
      <IonHeader translucent={true} mode="ios">
        <IonToolbar mode="ios">
          <IonTitle>Меню</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonModal isOpen={showModal} cssClass="my-custom-class">
          {showModal && (
            <>
              <IonCard mode="ios">
                <img src={`data:image/png;base64, ${currentMenu.img}`}></img>
                <IonCardHeader>
                  <IonCardSubtitle>Из чего состоит</IonCardSubtitle>
                  <IonCardTitle>{currentMenu.name}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>{currentMenu.description}</IonCardContent>
              </IonCard>
              <IonButton color="secondary" size="default" onClick={() => setShowModal(false)}>
                Закрыть
              </IonButton>
            </>
          )}
        </IonModal>

        <IonHeader style={{ marginTop: 15, marginBottom: 10, marginLeft: 120 }}>
          <IonTitle>
            Корзина:{' '}
            {
              // @ts-ignore
              counter?.length
            }
          </IonTitle>
        </IonHeader>

        <IonList style={{ marginTop: 15 }} lines="inset">
          {menuItems &&
            // @ts-ignore
            menuItems.map((item, index) => {
              return (
                <IonItem key={index}>
                      <IonAvatar slot="start" onClick={() => modalAction(item.id)}>
                    <img
                      src={`data:image/png;base64, ${item.img}`}
                      style={{ borderRadius: 15, width: 200, height: 40 }}
                    />
                  </IonAvatar>
                  <IonLabel onClick={() => modalAction(item.id)} style={{ marginRight: '15px' }}>
                    <h3>{item.name}</h3>
                    <p>{item.price}</p>
                  </IonLabel>
                  <IonText>
                    {!!counter &&
                      // @ts-ignore
                      counter?.map((el: any) => {
                        if (el?.id === item.id) {
                          if (el?.count !== 0) {
                            return el?.count;
                          } else {
                            return '';
                          }
                        }
                      })}
                  </IonText>
                  <IonButton color="success" onClick={() => addItem(item.id)}>
                    <IonIcon icon={addCircleOutline} />
                  </IonButton>
                  <IonButton color="danger" onClick={() => removeItem(item.id)}>
                    <IonIcon icon={removeCircleOutline} />
                  </IonButton>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
