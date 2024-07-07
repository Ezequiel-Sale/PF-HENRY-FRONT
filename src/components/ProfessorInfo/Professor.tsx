import React from "react";
import md5 from "crypto-js/md5";

const Professor = ({
  name,
  email,
  schedule,
}: {
  name: string;
  email: string;
  schedule: string;
}) => {
  // Generar el hash MD5 del correo electrónico para Gravatar
  const emailHash = md5(email.trim().toLowerCase()).toString();
  const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}?d=robohash`;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg">
      <img
        src={gravatarUrl}
        alt="Professor"
        className="w-16 h-16 rounded-full"
      />
      <div>
        <div className="text-lg font-semibold">{name}</div>
        <div className="text-sm text-gray-600">{schedule}</div>
      </div>
    </div>
  );
};

export default Professor;
