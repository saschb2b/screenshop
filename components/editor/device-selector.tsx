"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import { useEditorState, useEditorDispatch } from "@/lib/editor-context";
import { DEVICES } from "@/lib/devices";

export function DeviceSelector() {
  const { device } = useEditorState();
  const dispatch = useEditorDispatch();

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Device
      </Typography>
      <Select
        size="small"
        fullWidth
        value={device.id}
        onChange={(e) => {
          const selected = DEVICES.find((d) => d.id === e.target.value);
          if (selected) dispatch({ type: "SET_DEVICE", payload: selected });
        }}
      >
        {DEVICES.map((d) => (
          <MenuItem key={d.id} value={d.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                gap: 1,
              }}
            >
              <span>{d.name}</span>
              <Chip
                label={d.store === "apple" ? "iOS" : "Android"}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: 20 }}
              />
            </Box>
          </MenuItem>
        ))}
      </Select>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 0.5, display: "block" }}
      >
        Export: {device.canvasWidth} x {device.canvasHeight}px
      </Typography>
    </Box>
  );
}
