import "./server-status.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Translated } from "@/i18n/Translated";
import { serverInfo as server } from "@/data/server";
export function ServerStatusBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="server-status-bar"
        onClick={() => setOpen(true)}
        aria-label="Informações do servidor"
      >
        <span className="server-population">
          <span
            className={"server-dot " + (server.online ? "is-online" : "")}
            aria-hidden="true"
          />
          <span>
            {server.players}{" "}
            <Translated text={server.online ? "online" : "offline"} />
          </span>
          <span className="server-version">{server.season}</span>
        </span>
        <span className="server-rates">
          <span>
            EXP <strong>×{server.experience}</strong>
          </span>
          <span>
            DROP <strong>×{server.drop}</strong>
          </span>
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Translated text="Informações do servidor" />
            </DialogTitle>
            <DialogDescription>
              <Translated text="Status e jogadores são dados simulados deste protótipo." />
            </DialogDescription>
          </DialogHeader>
          <div className="form-stack">
            <p className="font-semibold">
              {server.season} · {server.players}{" "}
              <Translated text="jogadores online" />
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["EXP", "×" + server.experience],
                ["DROP", "×" + server.drop],
                ["Master XP", "×" + server.masterExperience],
                ["Nível máximo", server.maxLevel],
                ["Máximo de resets", server.maxResets],
                ["Pontos por reset", server.pointsPerReset],
              ].map(([label, value]) => (
                <div key={label} className="rounded-lg bg-secondary p-4">
                  <p className="muted">
                    <Translated text={label} />
                  </p>
                  <p className="mt-1 font-semibold">{value}</p>
                </div>
              ))}
            </div>
            <Button asChild onClick={() => setOpen(false)}>
              <Link to="/server">
                <Translated text="Conhecer o servidor" />
              </Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
