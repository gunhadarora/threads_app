"use client"

import { sidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const BottomBar = () => {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 z-10 w-full rounded-t-3xl bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden">
      <div className="flex items-center justify-between gap-1.5">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`relative flex flex-col items-center gap-2 rounded p-2.5 flex-1 ${
                isActive && "bg-primary-500"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={30}
                height={30}
              />
              <p className="text-light-1 max-sm:hidden text-[12px]">{link.label.split(/\s+/)[0]}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomBar;
