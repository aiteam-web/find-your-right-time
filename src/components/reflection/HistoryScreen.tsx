import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { Reflection } from "@/pages/Index";

interface Props {
  onBack: () => void;
}

const resultLabels: Record<Reflection["result"], { emoji: string; label: string }> = {
  "not-ready": { emoji: "🌱", label: "Not the right time" },
  preparing: { emoji: "🌤", label: "Preparing" },
  ready: { emoji: "🌈", label: "Ready (with support)" },
};

const HistoryScreen = ({ onBack }: Props) => {
  const reflections: Reflection[] = JSON.parse(localStorage.getItem("reflections") || "[]");

  return (
    <div className="min-h-svh bg-background flex flex-col items-center">
      <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center min-h-svh space-y-6">
        <div className="w-full flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-2xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-semibold text-foreground">📜 Your Past Reflections</h1>
        </div>

        {reflections.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-muted-foreground text-center">You haven't saved any reflections yet.</p>
          </div>
        ) : (
          <div className="w-full space-y-3">
            {[...reflections].reverse().map((ref, i) => {
              const data = resultLabels[ref.result];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="w-full p-5 rounded-2xl bg-card shadow-card flex items-center gap-4"
                >
                  <span className="text-2xl">{data.emoji}</span>
                  <div>
                    <p className="font-medium text-foreground">{data.label}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(ref.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
