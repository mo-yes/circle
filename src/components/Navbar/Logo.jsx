  import LogoImage from "../../assets/circle-logo.png";

  {/* Logo Component */}
export default function Logo() {
  return <img
    src={LogoImage}
    alt="Logo"
    height={36}
    width={36}
    className="object-contain"
  />
}
