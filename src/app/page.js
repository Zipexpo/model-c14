"use client";
import Autocomplete from "@/components/ui/autocomplete";
import { Button } from "@/components/ui/button";
import Comboboxfree from "@/components/ui/combofree";
import { DatePicker } from "@/components/ui/datepicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { C14 } from "@/components/viz/c14";
import { C14_plotly } from "@/components/viz/c14_plotly";
import { cn, memberList } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import AutoSizer from "lp-react-virtualized-auto-sizer-react-18";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const metrics = [
  { key: "writing", label: "WRITING" },
  { key: "planning", label: "PLANNING" },
  { key: "learning", label: "LEARNING" },
  { key: "interpersonal", label: "INTERPERSONAL" },
  { key: "crisis_solving", label: "CRISIS SOLVING" },
  { key: "attendence", label: "ATTENDENCE" },
  { key: "problem_solving", label: "PROBLEM SOLVING" },
  { key: "listening", label: "LISTENING" },
  { key: "project_management", label: "PROJECT MANAGEMENT" },
  { key: "group_online", label: "GROUP ONLINE" },
  { key: "team_work", label: "TEAM WORK" },
  { key: "conflict_resolution", label: "CONFLICT RESOLUTION" },
  { key: "leadership", label: "LEADERSHIP" },
  { key: "presentation", label: "PRESENTATION" },
];

const metricsMap = metrics.reduce((acc, item) => {
  acc[item.key] = item.label;
  return acc;
}, {});

const schema = z.object({
  target_name: z.string(),
  // target_type: z.string(),
  group: z.string(),
  date: z.string(),
  user: z.string(),
  metrics: z.object(
    metrics.reduce((acc, item) => {
      acc[item.key] = z.coerce.number().min(0).max(5);
      return acc;
    }, {})
  ),
});
const defaultData = {
  metrics: metrics.reduce((acc, item) => {
    acc[item.key] = 0;
    return acc;
  }, {}),
};
export default function Home() {
  const [target, setTarget] = useState();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: defaultData,
  });
  const onSubmit = (data) => {
    // console.log(data);
  };
  const mem = useMemo(() => {
    return [
      {
        heading: "Thành viên",
        member: memberList.members.map((d) => ({
          label: d.name,
          value: d.name,
        })),
      },
    ];
  }, [memberList]);
  const target_name = form.watch("target_name");
  useEffect(() => {
    if (target_name) {
      const target = memberList.members.find((d) => d.name === target_name);
      setTarget(target);
    }
  }, [target_name, memberList]);
  const metricsVal = form.watch("metrics");
  const [vizdata, setVizdata] = useState([]);
  const updateViz = () => {
    setVizdata(
      Object.keys(metricsVal).map((k) => ({
        subject: metricsMap[k],
        c14: metricsVal[k] ?? 0,
      }))
    );
  };
  useEffect(() => {
    updateViz();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 sm:items-start">
        <h1 className="text-lg font-bold">C14 - MODEL ASSESSMENT</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-col space-y-2 w-full"
          >
            <div className="flex items-center gap-2">
              <p className="">Họ & tên người được đánh giá:</p>
              <FormField
                control={form.control}
                name="target_name"
                render={({ field }) => (
                  <FormItem>
                    <Comboboxfree predefined={mem} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <p className="">Mentor / Mentee / TeamLeader:</p>
              <Button
                variant="outline"
                role="combobox"
                className={cn("w-[200px] justify-between")}
              >
                {target?.type}
              </Button>
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2">
                <p className="">Nhóm:</p>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-[200px] justify-between")}
                >
                  {memberList.name}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <p className="">Ngày đánh giá:</p>
                <DatePicker />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="">Họ & tên người đánh giá:</p>
              <FormField
                control={form.control}
                name="user"
                render={({ field }) => (
                  <FormItem>
                    <Comboboxfree predefined={mem} {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="print:hidden grid grid-cols-4 md:grid-cols-6 gap-2">
              {metrics.map(({ key, label }) => (
                <FormField
                  key={key}
                  control={form.control}
                  name={`metrics.${key}`}
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e); // Update the form state
                            form.trigger(); // Trigger validation
                            updateViz();
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </form>
        </Form>
        <div className="w-full max-h-[600px] overflow-x-visible flex">
          {/* <C14 data={vizdata} dataKey="value" /> */}
          <div className="w-full max-w-[550px] overflow-x-visible h-[600px] m-auto">
            <C14_plotly data={vizdata} dataKey="value" />
          </div>
        </div>
        <div className="flex items-center gap-2 w-full relative">
          <div className="grid grid-cols-12 w-full">
            <div></div>
            <div className="relative h-4 w-full bg-gradient-to-r from-white to-black col-span-10"></div>
            <div></div>
          </div>
          <div className="absolute -top-6 left-0 w-full flex justify-between font-bold legend">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <div className="absolute top-6 left-0 w-full flex justify-between legend">
            <span>Rất yếu</span>
            <span>Yếu</span>
            <span>Trung bình</span>
            <span>Khá</span>
            <span>Tốt</span>
            <span>Rất tốt</span>
          </div>
        </div>
      </main>
    </div>
  );
}
