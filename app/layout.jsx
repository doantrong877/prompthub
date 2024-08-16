import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ReactNode, Suspense } from "react";
export const metadata = {
    title: "PromptHub",
    description: 'Unveil and Disseminate Machine Learning Ideas',
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <body>
            <Provider>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
                <Nav/>

                <Suspense fallback={null}>
            {children}
        </Suspense>
            </main>
            </Provider>
            
        </body>
    </html>
  )
}

export default RootLayout