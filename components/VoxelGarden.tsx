/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

const VoxelGarden: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <iframe
        src="/voxel-scene.html"
        className="w-full h-full border-0"
        style={{ background: "transparent" }}
        title="Voxel Garden 3D Scene"
        allow="fullscreen"
      />
    </div>
  );
};

export default VoxelGarden;
