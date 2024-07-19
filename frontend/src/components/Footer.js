import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    const styles = `
      footer {
        background-color: black;
        padding: 20px;
        text-align: center;
        font-family: 'Lato', sans-serif;
        margin-bottom: -40px;
      }

      #containerFooter {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }

      .webFooter {
        width: 200px;
        margin-bottom: 30px;
        text-color: white;
      }

      .webFooter h3 {
        font-size: 18px;
        margin-bottom: 10px;
        color: white;
      }

      .webFooter p {
        font-size: 14px;
        color: white;
        line-height: 1.5;
      }

      #credit {
        margin-top: 20px;
        font-size: 12px;
        color: #888;
      }

      #credit a {
        color: white;
        text-decoration: none;
      }

      #credit a:hover {
        text-decoration: underline;
        
      }
    `;

    // Create a style element and add the CSS to the document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = styles;
    document.head.appendChild(styleElement);

    // Cleanup function to remove the style element when component unmounts
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <footer >
      <section>
        <div id="containerFooter">
          <div className="webFooter">
            <h3>How to Use?</h3>
            <p>Sorter & CIS</p>
            <p>Paper Shredders</p>
            <p>online images</p>
          </div>
          <div className="webFooter">
            <h3>Services</h3>
            <p>Currency Counting Machine</p>
            <p>Counting Machine</p>
            <p>Counting Machine</p>
          </div>
          <div className="webFooter">
            <h3>Features</h3>
            <p>Counting Machine</p>
            <p>Currency Counting Machine</p>
            <p>Currency Counting Machine</p>
            <p>Currency Counting Machine</p>
            <p>+ many more</p>
          </div>
          <div className="webFooter">
            <h3>Tutorials</h3>
            <p>Currency Counting Machine</p>
            <p>Counting Machine</p>
            <p>Counting Machine</p>
          </div>
        </div>
        <div id="credit">
          <a href="">© SYSTEMATIKS</a> Cash Counting Machines | Fake Note Detector <a href="" target="_blank"></a>
        </div>
      </section>
    </footer>
  );
}

export default Footer;