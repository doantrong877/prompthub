import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider'
import { ReactNode, Suspense } from "react";
export const metafata = {
    title: "PromptHub",
    description: 'Discover & Share AI Prompts'
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