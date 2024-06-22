'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@writeme/wmc';
import { ModeToggle } from '@writeme/wmc/lib/ui/theme-switcher';
import Link from 'next/link';
import { cn } from '@writeme/wmc/utils';
import { signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@writeme/wmc/lib/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@writeme/wmc/lib/ui/popover';
import { useOnborda } from 'onborda';
import { useEffect } from 'react';


const LocalNavbar = () => {
  const pathname = usePathname();

  const { data: session} = useSession();


  const { startOnborda } = useOnborda();

  useEffect(() => {
    startOnborda();

  }, []);

  return (
    <div className="bg-background sticky top-0 z-50 border-b h-16 flex p-3 items-center justify-between">
      <div className="flex items-center ">
        <Link href="/" style={{ width: '10rem' }}>
          <svg width="175" height="48" fill="none" className="transition-colors">
            <g clipPath="url(#a)">
              <path fill="transparent" d="M0 0h175v48H0z" />
              <path className="text-black fill-current dark:text-white"
                    d="M10.112 20.096c-.235.192-.48.373-.736.544-.256.17-.555.256-.896.256-.32 0-.48-.288-.48-.864 0-1.173.544-2.133 1.632-2.88C10.677 16.384 11.936 16 13.408 16s2.55.523 3.232 1.568c.555.832.832 1.963.832 3.392 0 .619-.117 1.419-.352 2.4-1.216 5.077-1.835 8.597-1.856 10.56.021.939.416 1.579 1.184 1.92.299.128.65.192 1.056.192 1.899 0 3.69-1.12 5.376-3.36-.853-2.987-1.28-6.379-1.28-10.176 0-1.408.33-2.55.992-3.424.683-.896 1.781-1.344 3.296-1.344 1.13 0 1.984.32 2.56.96.597.64.896 1.483.896 2.528 0 2.155-.565 4.81-1.696 7.968a31.304 31.304 0 0 1-1.344 3.168c.917 2.475 2.133 3.712 3.648 3.712 1.707 0 3.2-1.152 4.48-3.456.939-1.685 1.707-3.979 2.304-6.88-1.557-.213-2.795-.875-3.712-1.984-.896-1.11-1.344-2.293-1.344-3.552s.395-2.304 1.184-3.136c.79-.832 1.867-1.248 3.232-1.248 1.365-.021 2.39.459 3.072 1.44.683.96 1.024 2.272 1.024 3.936v.64c0 .235-.01.49-.032.768.363-.17.672-.341.928-.512.256-.192.512-.288.768-.288.427 0 .64.181.64.544 0 .704-.235 1.323-.704 1.856-.448.533-1.056.939-1.824 1.216-.277 2.496-.65 4.459-1.12 5.888-.875 2.752-2.027 4.843-3.456 6.272-1.707 1.664-3.808 2.507-6.304 2.528-2.07 0-3.755-1.376-5.056-4.128-2.176 2.752-4.65 4.128-7.424 4.128-1.899 0-3.413-.47-4.544-1.408-1.11-.96-1.664-2.464-1.664-4.512 0-.49.267-1.781.8-3.872.555-2.112.992-3.84 1.312-5.184.32-1.365.48-2.443.48-3.232 0-1.728-.437-2.592-1.312-2.592a1.47 1.47 0 0 0-.832.256c-.235.17-.48.352-.736.544Zm15.52.32c-.555 0-.832.864-.832 2.592 0 1.728.15 3.467.448 5.216.81-2.112 1.216-4.16 1.216-6.144 0-.427-.075-.81-.224-1.152-.128-.341-.33-.512-.608-.512Zm10.816-1.824c-.448 0-.672.352-.672 1.056 0 1.28.501 2.208 1.504 2.784.085-.81.128-1.355.128-1.632 0-.597-.075-1.077-.224-1.44-.17-.512-.416-.768-.736-.768Zm10.09 16.032.192 3.904c0 .512-.266.97-.8 1.376-.533.405-1.258.608-2.176.608-.533 0-.906-.277-1.12-.832-.192-.555-.288-1.365-.288-2.432 0-2.24.107-3.99.32-5.248.235-1.28.683-2.57 1.344-3.872-.981-.939-1.472-1.75-1.472-2.432 0-1.43.768-2.144 2.304-2.144.79 0 1.483.416 2.08 1.248.427.576.736 1.248.928 2.016.299.107.672.16 1.12.16.619 0 1.334-.203 2.144-.608l.832-.416c.256-.128.48-.192.672-.192.619 0 1.238.907 1.856 2.72a35.674 35.674 0 0 1-.64 2.4c-.213.768-.47 1.696-.768 2.784-.298 1.088-.458 1.824-.48 2.208 0 .363.118.544.352.544.32 0 .715-.203 1.184-.608.47-.405.939-.843 1.408-1.312.47-.49.896-.939 1.28-1.344.406-.405.683-.608.832-.608.299 0 .448.363.448 1.088 0 1.472-.65 2.923-1.952 4.352-1.28 1.43-2.752 2.133-4.416 2.112-.981 0-1.717-.395-2.208-1.184-.49-.79-.746-1.75-.768-2.88 0-2.24.502-4.363 1.504-6.368-.47.192-1.002.288-1.6.288-.576 0-.992-.021-1.248-.064-.192.81-.384 1.632-.576 2.464a9.89 9.89 0 0 0-.288 2.272Zm13.793 5.472c-2.133 0-3.2-1.995-3.2-5.984 0-2.176.267-4.15.8-5.92.832-2.73 1.77-4.096 2.816-4.096.619 0 1.11.416 1.472 1.248.299.64.438 1.27.416 1.888 0 .853-.256 2.357-.768 4.512-.49 1.877-.736 3.04-.736 3.488 0 .448.107.757.32.928.235.17.502.256.8.256.32 0 .715-.203 1.184-.608.47-.405.939-.843 1.408-1.312.47-.49.896-.939 1.28-1.344.406-.405.683-.608.832-.608.299 0 .448.363.448 1.088 0 1.493-.757 2.955-2.272 4.384-1.493 1.408-3.093 2.101-4.8 2.08Zm1.312-18.592c-.576-.853-.864-1.77-.864-2.752 0-.981.15-1.792.448-2.432.32-.661.619-1.141.896-1.44.278-.32.598-.48.96-.48.598 0 1.142.448 1.632 1.344.49.875.736 1.61.736 2.208 0 1.11-.394 1.984-1.184 2.624a4.068 4.068 0 0 1-2.624.928Zm5.569 16.768a8.407 8.407 0 0 1-.512-1.984c-.107-.768-.16-1.835-.16-3.2 0-1.365.256-3.21.768-5.536h-1.44c-.256 0-.384-.107-.384-.32 0-.512.042-.928.128-1.248.106-.341.341-.725.704-1.152h.768c.298 0 .618-.01.96-.032 1.024-3.285 2.07-4.928 3.136-4.928.853.021 1.45.565 1.792 1.632.085.299.181.619.288.96l-1.312 2.304c1.493.043 2.432.064 2.816.064.405 0 .618.043.64.128.042.064.064.17.064.32 0 .384-.096.864-.288 1.44-.17.576-.374.853-.608.832l-3.2-.16c-.448 2.603-.672 4.757-.672 6.464 0 1.707.245 2.56.736 2.56.405 0 1.141-.33 2.208-.992 1.066-.683 1.834-1.333 2.304-1.952.47-.619.853-.928 1.152-.928.298 0 .448.363.448 1.088 0 .725-.256 1.472-.768 2.24a9.898 9.898 0 0 1-1.952 2.08 10.801 10.801 0 0 1-2.592 1.536c-.939.405-1.76.608-2.464.608s-1.248-.16-1.632-.48c-.363-.341-.672-.79-.928-1.344Zm16.204-1.76c1.664 0 3.275-.661 4.832-1.984.576-.49 1.045-.939 1.408-1.344.363-.427.64-.64.832-.64.299 0 .448.299.448.896s-.16 1.27-.48 2.016c-.32.725-.853 1.44-1.6 2.144-1.835 1.728-4.352 2.592-7.552 2.592-2.539 0-4.267-.917-5.184-2.752-.32-.64-.48-1.557-.48-2.752 0-1.195.235-2.432.704-3.712.47-1.301 1.088-2.421 1.856-3.36.79-.939 1.696-1.664 2.72-2.176a6.967 6.967 0 0 1 3.264-.8c1.173 0 2.07.288 2.688.864.64.576.96 1.323.96 2.24 0 .917-.235 1.675-.704 2.272-.448.576-1.035 1.067-1.76 1.472-.725.384-1.536.736-2.432 1.056-.875.299-1.739.64-2.592 1.024v.8c.021.768.341 1.312.96 1.632.619.32 1.323.49 2.112.512Zm-.544-9.024c-1.11 0-1.877 1.29-2.304 3.872a37.8 37.8 0 0 1 1.248-.8c.405-.235.757-.459 1.056-.672.64-.47.97-1.003.992-1.6 0-.533-.33-.8-.992-.8Z" />
              <path fill="#97A8EE"
                    d="M120.823 32.448c.363 0 .544.49.544 1.472 0 .533-.224 1.184-.672 1.952a8.872 8.872 0 0 1-1.76 2.08 9.81 9.81 0 0 1-2.368 1.536 6.545 6.545 0 0 1-2.784.608c-.96 0-1.717-.31-2.272-.928-.533-.64-.8-1.344-.8-2.112 0-.79.128-1.675.384-2.656.256-.981.533-2.005.832-3.072.811-2.837 1.227-4.832 1.248-5.984 0-.49-.064-.864-.192-1.12-.128-.277-.373-.416-.736-.416-.64 0-1.323.384-2.048 1.152-.725.768-1.408 1.75-2.048 2.944-1.472 2.73-2.251 5.397-2.336 8l.128.896c.043.299.064.619.064.96 0 .683-.341 1.312-1.024 1.888-.661.555-1.408.832-2.24.832-.491 0-.853-.235-1.088-.704-.235-.49-.352-1.088-.352-1.792s.16-1.664.48-2.88c.32-1.216.672-2.507 1.056-3.872 1.024-3.605 1.547-6.293 1.568-8.064 0-.896-.117-1.6-.352-2.112-.213-.512-.64-.768-1.28-.768-1.152 0-2.293.821-3.424 2.464-1.13 1.643-2.144 4.192-3.04 7.648a37.605 37.605 0 0 0-.544 2.336l-.032.608c.405 1.963.608 3.243.608 3.84 0 1.237-.437 2.07-1.312 2.496-.405.192-.8.373-1.184.544-.363.17-.757.256-1.184.256-1.067 0-1.6-1.013-1.6-3.04 0-2.048.565-6.037 1.696-11.968.405-2.133.608-3.328.608-3.584 0-1.728-.437-2.592-1.312-2.592a1.47 1.47 0 0 0-.832.256c-.235.17-.48.352-.736.544-.235.192-.48.373-.736.544-.256.17-.555.256-.896.256-.32 0-.48-.288-.48-.864 0-1.173.544-2.133 1.632-2.88C91.052 16.384 92.322 16 93.815 16c1.92 0 3.05.896 3.392 2.688.085.533.15 1.099.192 1.696 1.579-2.965 3.573-4.448 5.984-4.448 2.624 0 4.128 1.259 4.512 3.776.128.725.181 1.504.16 2.336v.256c1.387-1.92 3.029-2.88 4.928-2.88 2.688 0 4.032 1.621 4.032 4.864 0 1.408-.224 3.061-.672 4.96a174.769 174.769 0 0 1-.96 4.064c-.192.81-.288 1.44-.288 1.888 0 .81.277 1.216.832 1.216.576 0 1.931-1.11 4.064-3.328.384-.427.661-.64.832-.64Zm6.406 4.064c1.664 0 3.274-.661 4.832-1.984.576-.49 1.045-.939 1.408-1.344.362-.427.64-.64.832-.64.298 0 .448.299.448.896s-.16 1.27-.48 2.016c-.32.725-.854 1.44-1.6 2.144-1.835 1.728-4.352 2.592-7.552 2.592-2.539 0-4.267-.917-5.184-2.752-.32-.64-.48-1.557-.48-2.752 0-1.195.234-2.432.704-3.712.469-1.301 1.088-2.421 1.856-3.36.789-.939 1.696-1.664 2.72-2.176a6.967 6.967 0 0 1 3.264-.8c1.173 0 2.069.288 2.688.864.64.576.96 1.323.96 2.24 0 .917-.235 1.675-.704 2.272-.448.576-1.035 1.067-1.76 1.472-.726.384-1.536.736-2.432 1.056-.875.299-1.739.64-2.592 1.024v.8c.021.768.341 1.312.96 1.632.618.32 1.322.49 2.112.512Zm-.544-9.024c-1.11 0-1.878 1.29-2.304 3.872a37.8 37.8 0 0 1 1.248-.8 13.4 13.4 0 0 0 1.056-.672c.64-.47.97-1.003.992-1.6 0-.533-.331-.8-.992-.8Z" />
              <path className="text-black fill-current dark:text-white"
                    d="M171.23 7.134c-1.733-.392-4.948.093-8.213 1.237-4.48 1.574-7.917 3.429-11.967 6.474-3.446 2.582-8.312 7.019-11.184 10.174l-.514.563.276.132c.267.128.282.12.728-.302 2.031-1.91 6.117-5.142 9.141-7.242 5.959-4.125 11.19-6.934 16.018-8.593 1.347-.461 3.737-1.153 3.832-1.107.026.012-.06.057-.186.1-3.891 1.275-7.217 2.79-11.548 5.269-3.784 2.16-8.844 5.584-13.515 9.149-1.604 1.218-3.787 2.96-3.827 3.043-.015.032.058.145.163.258l.198.206.565-.358c1.178-.731 2.579-1.151 4.266-1.284.895-.074 2.212-.054 2.943.037.261.03.343.015.231-.039-.311-.149-1.563-.435-2.318-.522-.403-.044-.704-.102-.663-.122.041-.02.796-.066 1.675-.108 4.322-.204 5.488-.313 6.959-.636 1.711-.381 3.226-.974 4.992-1.957.797-.443 2.147-1.311 2.19-1.4.006-.013-.209-.007-.466.02-.268.028-.92.037-1.443.022-.997-.023-4.626-.334-4.668-.401-.011-.021.514-.053 1.151-.077 4.282-.145 7.161-.924 8.992-2.442.778-.648 2.827-2.949 4.351-4.888.229-.3.477-.596.532-.665.11-.12.09-.122-.526-.165-.36-.024-1.078-.14-1.605-.26a15.805 15.805 0 0 0-1.75-.29c-.601-.052-.742-.089-.576-.127.34-.088 1.477-.069 2.832.047 1.527.136 2.154.067 2.608-.28.504-.387 1.074-1.112 1.377-1.744.294-.613.341-.976.146-1.187-.173-.193-.709-.426-1.197-.535ZM138.499 26.32c-.319.2-1.113.66-1.767 1.006l-1.185.633-1.162 2.31c-.633 1.276-1.084 2.238-1 2.152 2.575-2.669 2.754-2.866 2.714-3.136-.073-.467.494-.785.977-.553.336.161.435.398.288.704-.104.217-.193.269-.572.33-.494.078-.434.02-2.319 1.913-.554.558-1.02 1.042-1.035 1.074-.019.038.211-.064.5-.224.687-.393 2.486-1.29 3.907-1.95l1.136-.532.061-.348c.034-.204.324-.897.684-1.604l.63-1.246-.345-.165a2.89 2.89 0 0 1-.632-.453l-.298-.284-.582.372ZM153.938 33.374c-6.735-2.949-10.847-4.262-11.926-3.805-.332.139-.416.578-.205 1.001.378.74 1.281 1.51 4.539 3.899 2.423 1.783 3.159 2.372 3.817 3.08.989 1.056.716 1.648-.724 1.53-2.128-.164-5.272-1.264-12.912-4.514-1.428-.606-2.509-1.03-2.524-.999-.046.096 5.483 2.639 7.297 3.368 5.65 2.247 8.947 3.005 9.647 2.21.712-.798-.378-2.02-4.19-4.737-2.57-1.83-3.321-2.41-4.076-3.158-.46-.457-.798-1.059-.703-1.257.215-.447 1.784-.267 4.084.467 2.633.84 5.545 2 11.209 4.483.291.124.001-.023-.635-.336-.638-.306-1.858-.86-2.698-1.232Z" />
            </g>
            <defs>
              <clipPath id="a">
                <path fill="#fff" d="M0 0h175v48H0z" />
              </clipPath>
            </defs>
          </svg>
        </Link>
      </div>

      {pathname == '/myworks' || pathname.startsWith('/stories') || pathname == "/myworks/new" ? (<div className="flex gap-2 items-center">
        {session ? (<Link href="/myworks"
                       className={cn(buttonVariants({ variant: 'link' }), pathname == '/myworks' ? 'underline' : '')}>My
          Stories</Link>) : <></>}
        {session ? (<Link id="new-my-works" href="/myworks/new"
                          className={cn(buttonVariants({ variant: 'link' }), pathname == '/myworks/new' ? 'underline' : '')}>
          New Story</Link>) : <></>}

        <Link href="/stories"
              className={cn(buttonVariants({ variant: 'link' }), pathname == '/stories' ? 'underline' : '')}>Explore</Link>
      </div>) : undefined}


      <div className="flex items-center gap-4">
        { pathname == "/" ? <Link href="/stories" className={buttonVariants({ variant: 'link' })}>Explore</Link> : <></>}


        <ModeToggle></ModeToggle>
        { session?.user ? (
            <Popover>
              <PopoverTrigger><Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>{session.user.name.at(0)}</AvatarFallback>
              </Avatar></PopoverTrigger>
              <PopoverContent>
                <div>
                  <Link className={cn(buttonVariants({variant: 'ghost'}), 'block fit-content')} href="/myworks">My Stories</Link>
                  <Link className={cn(buttonVariants({variant: 'ghost'}), 'block')} href={`/user/${session.user.id}`}>My Profile</Link>
                  <Button variant='ghost' onClick={() => signOut({callbackUrl: '/'})} >Sign Out</Button>
                </div>
              </PopoverContent>
            </Popover>

        ): <Link className={buttonVariants({ variant: 'default' })} data-testid="sign_up_button" href="/auth/login">Login</Link>}
      </div>
    </div>
  );
};

export default LocalNavbar;
