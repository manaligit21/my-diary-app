import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useEntries } from "../GlobalContext/Entries";
import styles from "./MoodPieChart.module.css";

export default function MoodPieChart({ month, year }) {
  const { entries, COLORS } = useEntries();

  // Filter entries for the current month and year
  const filteredEntries = entries.filter((entry) => {
    const date = new Date(entry.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  // Count moods for that month
  const moodCounts = filteredEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(moodCounts).map((mood) => ({
    name: mood,
    value: moodCounts[mood],
  }));

  if (data.length === 0) {
    return <div className={styles.noEntries}>No Entries This Month</div>;
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>
        {`Mood Distribution - ${new Date(year, month).toLocaleString(
          "default",
          {
            month: "long",
          }
        )}`}
      </h3>
      <PieChart width={320} height={320} className={styles.pieChart}>
        <Pie
          data={data}
          innerRadius={50}
          dataKey="value"
          className={styles.pie}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.name]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
