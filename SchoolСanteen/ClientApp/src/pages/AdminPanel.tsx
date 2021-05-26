import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router';

const AdminPanel: React.FC = () => {
  const history = useHistory();
  const routeChange = () => {
    history.push('/newmenu');
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Админ панель</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed" style={{ marginLeft: 3, marginRight: 3 }}>
        <IonButton expand="block" color="secondary" onClick={routeChange}>
          Добавить меню
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;
