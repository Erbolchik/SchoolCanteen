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
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonInput,
  IonTextarea,
  IonButton,
  IonLoading,
  IonToast,
} from '@ionic/react';
import { useState, useEffect, useContext } from 'react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './AddingMenu.css';
import { saveFood } from '../api';
import { Context } from '../defaults';

export function usePhotoGallery() {
  const [photos, setPhotos] = useState<UserPhoto[]>([]);

  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });
    console.log(cameraPhoto);

    const fileName = new Date().getTime() + '.jpeg';
    const newPhotos = [
      {
        filepath: fileName,
        webviewPath: cameraPhoto.base64String,
      },
      ...photos,
    ];
    setPhotos(newPhotos);
  };
  return {
    takePhoto,
    photos,
    setPhotos,
  };
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

const AddingMenu: React.FC = () => {
  const { photos, takePhoto, setPhotos } = usePhotoGallery();
  const { setUpdateFood } = useContext(Context);
  const [data, setData] = useState<any>({
    img: '',
    name: '',
    desc: '',
    price: '',
  });
  const [loading, setLoading] = useState(false);
  const [toastOptions, setToastOptions] = useState({ isOpen: false, isError: false });

  const sendData = () => {
    setLoading(true);
    data.img = photos[0].webviewPath;

    saveFood(data)
      .then((res: any) => {
        setLoading(false);
        setToastOptions({ isOpen: true, isError: false });
        setUpdateFood(true);
        setData({ img: '', name: '', description: '', price: '' });
        setPhotos([]);
      })
      .catch(() => {
        setToastOptions({ isOpen: true, isError: true });
        setLoading(false);
      });
  };
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/admin" />
          </IonButtons>
          <IonTitle>Добавить меню:</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen slot="fixed">
        <IonLoading
          cssClass="my-custom-class"
          isOpen={loading}
          onDidDismiss={() => setLoading(false)}
          message={'Обработка...'}
        />
        <IonToast
          isOpen={toastOptions.isOpen}
          onDidDismiss={() => setToastOptions({ isOpen: false, isError: false })}
          message={
            toastOptions.isError
              ? 'Проишла ошибка , повторите попытку чуть позже '
              : 'Успешно добавлено'
          }
          duration={3000}
        />
        <div>
          {photos.length > 0 && <img src={`data:image/png;base64, ${photos[0].webviewPath}`}></img>}
        </div>
        <div className="photoBlock">
          <IonFabButton onClick={() => takePhoto()} disabled={photos.length > 0}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </div>
        <div className="formBlock">
          <IonItem>
            <IonLabel position="floating">Название:</IonLabel>
            <IonInput
              value={data.name}
              placeholder="Название вашего продукта"
              onIonChange={(e) => {
                setData({ ...data, name: e.detail.value });
              }}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Описание:</IonLabel>
            <IonTextarea
              value={data.description}
              placeholder="Описание для вашего продукта"
              onIonChange={(e) => {
                setData({ ...data, description: e.detail.value });
              }}></IonTextarea>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Цена:</IonLabel>
            <IonInput
              value={data.price}
              placeholder="Цена"
              type="number"
              onIonChange={(e) => {
                setData({ ...data, price: e.detail.value });
              }}
            />
          </IonItem>
        </div>
        <div className="photoBlock">
          <IonButton color="secondary" onClick={() => sendData()}>
            Добавить
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddingMenu;
