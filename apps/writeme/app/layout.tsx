import './global.css';
import { Toaster } from '@writeme/wmc/lib/ui/toaster';
import { Toaster as Sonner } from '@writeme/wmc/lib/ui/sonner';
import { ThemeProvider } from '../components/theme-provider';
import SessionWrapper from '../components/session-provider';
// import { ViewTransitions } from 'next-view-transitions';
import { Onborda, OnbordaProvider, Step } from 'onborda';
import { Book, HandIcon } from 'lucide-react';
export const metadata = {
  title: 'WriteMe',
  description:
    'WriteMe is a platform for writers to create, share, and explore stories with intuitive tools, secure logins, and a vibrant community',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const steps = [
    {
      icon: <>👋</>,
      title: 'Step 1',
      content: 'Here you can create your first story',
      selector: '#new-my-works',
      nextRoute: '/myworks/new',
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'bottom',
    },
    {
      icon: <>✏️</>,
      title: 'Step 2',
      content: 'Give your Story a title...',
      selector: '#onborda-new-story-title',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: '/myworks',
      showControls: true,
      side: 'right',
    },
    {
      icon: <>👋</>,
      title: 'Step 3',
      content: 'Click Create',
      selector: '#onborda-new-story-create',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>📖</>,
      title: 'Here you can see your New Story',
      content: '',
      selector: '#my-story',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>📖</>,
      title: 'There are currently no chapters',
      content: '',
      selector: '#chapters-toc',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>✏️</>,
      title: 'Step 4: Create Your First Chapter',
      content: '',
      selector: '#toc-create-chapter',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>✏️</>,
      title: "Step 5: Edit the chapter's metadata",
      content: '',
      selector: '#new-chapter-form',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>✏️</>,
      title: 'Step 6: Submit',
      content: '',
      selector: '#new-chapter-submit',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>✏️</>,
      title: "Step 7: It's time to start Writing!",
      content: 'This is the main editor panel',
      selector: '#editor-main-panel',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'right',
    },
    {
      icon: <>✏️</>,
      title: "Step 7: It's time to start Writing!",
      content: 'This is the Tools panel',
      selector: '#editor-tools-panel',
      nextRoute: undefined,
      pointerPadding: 10,
      pointerRadius: 10,
      prevRoute: undefined,
      showControls: true,
      side: 'left',
    },
  ] satisfies Step[];
  return (
    // <ViewTransitions>
    <html lang="en">
      <body style={{
        minHeight: "100%"
      }}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionWrapper>
            <OnbordaProvider>
              <Onborda steps={steps} showOnborda={true}>
                {children}
              </Onborda>
            </OnbordaProvider>
            <Toaster></Toaster>
            <Sonner></Sonner>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
    // </ViewTransitions>
  );
}
