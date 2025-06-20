import { NavBar, NavItem } from "@ybot1122/toby-ui/NavBar";
import { SdkSection } from "components/SdkSection";
import TabbedDemo from "components/TabbedDemo";

export const NavBarSection = () => {
  return (
    <SdkSection id="NavBar" title="Nav Bar">
      <div>
        <p className="my-8">
          Nav Bar that is also responsive and collapses on smaller screens.
        </p>

        <TabbedDemo
          Demo={
            <NavBar
              iconFill="fill-blue-500"
              logo={
                <img
                  width={130}
                  height={130}
                  src="https://www.itsprobablyspicy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.1b69983d.png&w=384&q=75"
                />
              }
            >
              <NavItem key="1">
                <a href="#" className="flex items-center md:justify-center p-5">
                  Item One
                </a>
              </NavItem>
              <NavItem key="2">
                <a href="#" className="flex items-center md:justify-center p-5">
                  Item Four Four Four
                </a>
              </NavItem>
              <NavItem backgroundColor="bg-green-300" key="3">
                <a href="#" className="flex items-center md:justify-center p-5">
                  Item
                </a>
              </NavItem>
              <NavItem hoverBottomColor="bg-purple-500" key="4">
                <a href="#" className="block p-5">
                  Item One <EtsyLogo fill="fill-orange-700" />
                </a>
              </NavItem>
            </NavBar>
          }
          markdown={`\`\`\`tsx
import { NavBar, NavItem } from "@ybot1122/toby-ui/NavBar";
<NavBar
  iconFill="fill-blue-500"
  logo={
    <img
      width={130}
      height={130}
      src="https://www.itsprobablyspicy.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FITS-PROBABLY-SPICY_PRIMARY-LOGO_persimmon-768x768.1b69983d.png&w=384&q=75"
    />
  }
>
  <NavItem key="1">
    <a href="#" className="flex items-center md:justify-center p-5">
      Item One
    </a>
  </NavItem>
  <NavItem key="2">
    <a href="#" className="flex items-center md:justify-center p-5">
      Item Four Four Four
    </a>
  </NavItem>
  <NavItem backgroundColor="bg-green-300" key="3">
    <a href="#" className="flex items-center md:justify-center p-5">
      Item
    </a>
  </NavItem>
  <NavItem hoverBottomColor="bg-purple-500" key="4">
    <a href="#" className="block p-5">
      Item One <EtsyLogo fill="fill-orange-700" />
    </a>
  </NavItem>
</NavBar>

`}
        />
      </div>
    </SdkSection>
  );
};
const EtsyLogo = ({ fill }: { fill: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 24"
    aria-hidden="true"
    focusable="false"
    className={`inline-block ml-1 ${fill}`}
    width="40"
  >
    <path d="M6.547,3.125v6.008c0,0,2.117,0,3.25-0.086c0.891-0.156,1.055-0.242,1.219-1.133l0.328-1.305h0.969l-0.164,2.852 l0.086,2.922h-0.977l-0.242-1.141c-0.242-0.812-0.57-0.977-1.219-1.055c-0.812-0.086-3.25-0.086-3.25-0.086v5.039 c0,0.969,0.492,1.383,1.625,1.383h3.414c1.055,0,2.109-0.086,2.766-1.625l0.883-1.953h0.82c-0.086,0.406-0.492,3.984-0.57,4.789 c0,0-3.086-0.078-4.383-0.078H5.25l-3.492,0.078v-0.883l1.133-0.25c0.82-0.164,1.062-0.406,1.062-1.055 c0,0,0.086-2.195,0.086-5.852c0-3.648-0.086-5.844-0.086-5.844c0-0.727-0.242-0.891-1.062-1.055L1.758,2.555V1.664l3.414,0.07h6.5 c1.297,0,3.484-0.234,3.484-0.234s-0.078,1.375-0.164,4.625h-0.891l-0.328-1.141c-0.32-1.461-0.805-2.188-1.703-2.188H6.961 C6.547,2.797,6.547,2.875,6.547,3.125z M19.703,3.766h0.977V7.18l3.336-0.164l-0.164,1.547l-3.25-0.25v6.016 c0,1.703,0.57,2.359,1.547,2.359c0.883,0,1.539-0.492,1.781-0.898l0.484,0.57c-0.484,1.133-1.859,1.703-3.164,1.703 c-1.617,0-2.93-0.969-2.93-2.836V8.398h-1.938V7.586C18.008,7.422,19.219,6.445,19.703,3.766z M26.695,14.242l0.648,1.547 c0.242,0.648,0.812,1.305,2.109,1.305c1.383,0,1.953-0.734,1.953-1.625c0-2.766-5.445-1.953-5.445-5.688c0-2.109,1.703-3.094,3.898-3.094c0.977,0,2.438,0.164,3.172,0.492c-0.164,0.812-0.25,1.867-0.25,2.68l-0.805,0.078l-0.57-1.625 c-0.164-0.398-0.82-0.727-1.625-0.727c-0.977,0-1.953,0.406-1.953,1.461c0,2.516,5.609,1.953,5.609,5.688c0,2.117-1.867,3.25-4.148,3.25c-1.703,0-3.414-0.656-3.414-0.656c0.164-0.969,0.086-2.023,0-3.086H26.695z M33.031,22.039 c0.242-0.891,0.406-2.023,0.57-3.086l0.891-0.078l0.328,1.703c0.078,0.406,0.32,0.734,0.969,0.734c1.055,0,2.438-0.648,3.742-2.922 c-0.578-1.383-2.281-5.844-3.828-9.258c-0.406-0.898-0.484-0.977-1.047-1.141l-0.414-0.156v-0.82l2.445,0.086l3-0.164V7.75 l-0.734,0.164c-0.57,0.078-0.805,0.398-0.805,0.727c0,0.086,0,0.164,0.078,0.328c0.156,0.492,1.461,4.141,2.438,6.578c0.805-1.703,2.352-5.523,2.594-6.172c0.086-0.328,0.164-0.406,0.164-0.648c0-0.414-0.242-0.656-0.805-0.812L42.039,7.75V6.938 l2.281,0.078l2.109-0.078V7.75l-0.406,0.32c-0.812,0.328-0.898,0.406-1.219,1.062l-3.57,8.359 c-2.117,4.797-4.312,5.203-5.852,5.203C34.406,22.695,33.672,22.445,33.031,22.039z"></path>
  </svg>
);
