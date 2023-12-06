import styles from './detail.module.css';
import { useParams } from 'react-router-dom';

export function Datail(){
    const { cripto } =useParams();
    return(
        <div>
            <h1>Página Detalhes {cripto}</h1>
        </div>
    )
}