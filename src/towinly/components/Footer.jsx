import SocialRow from "./SocialRow";

export default function Footer() {
  return (
    <footer className="page-foot">
      <div className="page-wrap">
        <SocialRow />
        <p className="page-foot-line">
          Built by Harshavardhan Anbu Gowri. Every fact on this page comes from the app, its code,
          or the founder's own notes. Photographs from Pexels, used under the Pexels licence.
        </p>
      </div>
    </footer>
  );
}
