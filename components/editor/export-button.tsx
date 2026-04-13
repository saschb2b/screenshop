"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Download, ChevronDown } from "lucide-react";
import type Konva from "konva";
import { useEditorState } from "@/lib/editor-context";
import { DEVICES } from "@/lib/devices";
import { exportCanvas } from "@/lib/export-utils";

interface ExportButtonProps {
  stageRef: React.RefObject<Konva.Stage | null>;
}

export function ExportButton({ stageRef }: ExportButtonProps) {
  const { device } = useEditorState();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleExportCurrent = () => {
    exportCanvas(stageRef.current, device);
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<Download size={16} />}
        onClick={handleExportCurrent}
        sx={{
          flex: 1,
          py: 1,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Export PNG
      </Button>
      <Button
        variant="contained"
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ minWidth: 32, px: 0.5 }}
      >
        <ChevronDown size={16} />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {DEVICES.map((d) => (
          <MenuItem
            key={d.id}
            onClick={() => {
              exportCanvas(stageRef.current, d);
              setAnchorEl(null);
            }}
          >
            <ListItemText>
              {d.name}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ ml: 1 }}
              >
                {d.canvasWidth}x{d.canvasHeight}
              </Typography>
            </ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
