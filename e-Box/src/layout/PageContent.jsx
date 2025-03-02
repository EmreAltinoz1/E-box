// # Sayfa düzeniyle ilgili ana bileşenler (Header, Footer, PageContent)
// PageContent.jsx

function PageContent(props) { // props parametresini ekleyin
    return (
      <div>
       
        {props.children} {/* Buraya props.children'ı ekleyin */}
      </div>
    );
  }

  export default PageContent;