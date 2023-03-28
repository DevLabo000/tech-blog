export interface Author {
  slug: string;
  name: string;
  fullName: string;
  profileImage: { src: string } | null;
  biography: string;
}
