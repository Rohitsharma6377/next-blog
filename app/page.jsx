import CardList from "./components/cardList/CardList";
import Category from "./components/category/Category";
import Feature from "./components/feature/Feature";
import Menu from "./components/menu/Menu";
import page from './page.module.css'
export default function Home() {
  return (
    <div className={page.container}>
      <Feature />
      <Category />
      <div className={page.content}>
        <CardList/>
        <Menu/>
      </div>
    </div>
  );
}
