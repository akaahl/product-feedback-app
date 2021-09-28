import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Jost', sans-serif
    }

    body {
        
        background: #F2F4FF;
        font-family: 'Jost', sans-serif;
        
        @media (max-width: 768px) {
                    
            overflow-x: hidden;
        }
    }

 
`;

export default GlobalStyle;
